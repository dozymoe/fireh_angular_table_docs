from twisted.web.resource import NoResource
from pages.base import BasePage
from pages.note import NotePage

class RestPage(BasePage):
    def getChild(self, name, request):
        name = name.decode()
        if name == 'notes':
            return NotePage(self.app)

        return NoResource()
