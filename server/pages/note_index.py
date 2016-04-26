from twisted.internet.defer import inlineCallbacks, returnValue
from pages.base_index import BaseIndexPage

class NoteIndexPage(BaseIndexPage):
    @inlineCallbacks
    def get_query_GET(self, **kwargs):
        rows = yield self.app.dbconn.runQuery('select id,author,title,body,'
                'created_at,modified_at from notes')
        total = yield self.app.dbconn.runQuery('select count(id) from notes')
        paged_rows = rows[:10]
        result = {'items':paged_rows, 'total':total[0][0]}
        returnValue(result)
