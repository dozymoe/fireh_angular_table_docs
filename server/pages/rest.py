from twisted.web.resource import NoResource
from pages.author import AuthorPage
from pages.base import BasePage
from pages.country import CountryPage
from pages.note import NotePage

class RestPage(BasePage):
    def getChild(self, name, request):
        name = name.decode()
        if name == 'authors':
            return AuthorPage(self.app)
        elif name == 'countries':
            return CountryPage(self.app)
        elif name == 'notes':
            return NotePage(self.app)

        return NoResource()
