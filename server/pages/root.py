from twisted.web.resource import NoResource
from pages.base import BasePage
from pages.rest import RestPage

class RootPage(BasePage):

    def getChild(self, name, request):
        name = name.decode()
        if name == 'rest':
            return RestPage(self.app)

        return NoResource()
