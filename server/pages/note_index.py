from arrow import utcnow
from twisted.internet.defer import inlineCallbacks, returnValue
from pages.base_index import BaseIndexPage

class NoteIndexPage(BaseIndexPage):

    filter_fields = (('author', str), ('title', str), ('country', int))
    input_fields = ('author', 'title', 'body', 'country')
    select_fields = ('id', 'author', 'title', 'body', 'created_at', 'modified_at',
            'country')

    order_fields = ('author', 'created_at', 'id', 'title')


    @inlineCallbacks
    def run_query_GET(self, params):
        total_sql = 'select count(*) from notes'
        select_sql = 'select ' + ','.join(self.select_fields) + ' from notes'

        filter_by = self.get_sql_filter_by_clause(params, self.filter_fields)

        if len(filter_by):
            total_sql += ' where ' + filter_by
            select_sql += ' where ' + filter_by

        order_by = self.get_sql_order_by_clause(params, self.order_fields)

        if len(order_by):
            select_sql += order_by
        else:
            select_sql += ' order by id'

        total = yield self.app.dbconn.runQuery(total_sql)
        total = total[0][0]

        rows = yield self.app.dbconn.runQuery(select_sql)

        page, pageSize = self.get_pager(params, total)
        paged_rows = [dict(zip(self.select_fields, row)) for row in \
                rows[page * pageSize : (page + 1) * pageSize]]

        result = {'items': paged_rows, 'total': total}
        returnValue(result)


    @inlineCallbacks
    def run_query_POST(self, submission, params):
        note = yield self.app.dbconn.runInteraction(self._create_note,
                submission)

        returnValue(note)


    @inlineCallbacks
    def _create_note(self, cur, submission):
        current_time = utcnow()

        fields = ['created_at', 'modified_at']
        values = [str(current_time), str(current_time)]
        for key in submission:
            if not key in self.input_fields:
                continue
            fields.append(key)
            values.append(submission[key])

        yield cur.execute('insert into notes(' + ','.join(fields) +\
                ') values (' + ','.join(['%s'] * len(fields)) +\
                ') returning id', values)

        id_ = cur.fetchone()[0]
        yield cur.execute('update counts set value=value+1 where name=%s',
                ('notes_total',))

        yield cur.execute('select ' + ','.join(self.select_fields) +\
                ' from notes where id=%s', (id_,))

        row = dict(zip(self.select_fields, cur.fetchone()))
        returnValue(row)
