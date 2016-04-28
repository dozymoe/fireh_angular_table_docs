from twisted.web.resource import NoResource
from pages.base import BasePage
from pages.author_index import AuthorIndexPage

class AuthorPage(BasePage):
    def getChild(self, name, request):
        name = name.decode()
        if len(name) == 0:
            return AuthorIndexPage(self.app)

        return NoResource()
