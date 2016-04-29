from arrow import utcnow
from twisted.internet.defer import inlineCallbacks, returnValue
from pages.base_detail import BaseDetailPage

class NoteDetailPage(BaseDetailPage):

    filter_fields = ()
    input_fields = ('author', 'title', 'body')
    select_fields = ('id', 'author', 'title', 'body', 'created_at', 'modified_at',
            'country')

    order_fields = ()


    @inlineCallbacks
    def run_query_GET(self, params):
        select_sql = 'select ' + ','.join(self.select_fields) +\
                ' from notes where id=%s'

        rows = yield self.app.dbconn.runQuery(select_sql, (self.id_,))
        if len(rows):
            result = dict(zip(self.select_fields, rows[0]))
            returnValue(result)

        returnValue(None)


    @inlineCallbacks
    def _update_note(self, cur, submission, params):
        current_time = utcnow()

        fields = ['modified_at=%s']
        values = [str(current_time)]
        for key in self.input_fields:
            if not key in submission:
                continue
            fields.append(key + '=%s')
            values.append(submission[key])

        yield cur.execute('update notes set ' + ','.join(fields) +\
                ' where id=%s', values + [self.id_])

        if cur.rowcount == 0:
            returValue(None)

        yield cur.execute('select ' + ','.join(self.select_fields) +\
                ' from notes where id=%s', (self.id_,))

        row = dict(zip(self.select_fields, cur.fetchone()))
        returnValue(row)


    @inlineCallbacks
    def run_query_PUT(self, submission, params):
        result = yield self.app.dbconn.runInteraction(self._update_note,
                submission, params)
        returnValue(result)


    @inlineCallbacks
    def _delete_note(self, cur):
        delete_sql = 'delete from notes where id=%s'
        yield cur.execute(delete_sql, (self.id_,))
        returnValue(cur.rowcount)


    @inlineCallbacks
    def run_query_DELETE(self, params):
        result = yield self.app.dbconn.runInteraction(self._delete_note)
        returnValue(result)
