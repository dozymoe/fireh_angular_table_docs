from twisted.web.resource import NoResource
from pages.base import BasePage
from pages.country_index import CountryIndexPage

class CountryPage(BasePage):
    def getChild(self, name, request):
        name = name.decode()
        if len(name) == 0:
            return CountryIndexPage(self.app)

        return NoResource()
