from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.web.error import UnsupportedMethod
from pages.base_index import BaseIndexPage

class AuthorIndexPage(BaseIndexPage):

    filter_fields = (('author', str),)
    input_fields = ()
    select_fields = ('author',)
    order_fields = ()


    @inlineCallbacks
    def run_query_GET(self, params):
        total_sql = 'select count(distinct author) from notes'
        select_sql = 'select distinct author from notes'

        filter_by = self.get_sql_filter_by_clause(params, self.filter_fields)

        if len(filter_by):
            total_sql += ' where ' + filter_by
            select_sql += ' where ' + filter_by

        select_sql += ' order by author'

        total = yield self.app.dbconn.runQuery(total_sql)
        total = total[0][0]

        rows = yield self.app.dbconn.runQuery(select_sql)

        page, pageSize = self.get_pager(params, total)
        paged_rows = [dict(zip(self.select_fields, row)) for row in \
                rows[page * pageSize : (page + 1) * pageSize]]

        result = {'items': paged_rows, 'total': total}
        returnValue(result)


    def render_POST(self, request):
        raise UnsupportedMethod(allowedMethods)
