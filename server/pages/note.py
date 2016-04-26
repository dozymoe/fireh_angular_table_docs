from twisted.web.resource import NoResource
from pages.base import BasePage
from pages.note_index import NoteIndexPage
from pages.note_detail import NoteDetailPage

class NotePage(BasePage):
    def getChild(self, name, request):
        name = name.decode()
        if len(name) == 0:
            return NoteIndexPage(self.app)

        try:
            note_id = int(name)
        except ValueError:
            return NoResource()

        return NoteDetailPage(self.app, note_id)
