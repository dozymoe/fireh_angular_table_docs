from pages.base import BasePage

class BaseDetailPage(BasePage):

    isLeaf = True
    id_ = None

    def __init__(self, app, id_):
        super().__init__(app)
        self.id_ = id_


    def render_GET(self, request):
        return 'hai'


    def render_PUT(self, request):
        return 'hai'


    def render_DELETE(self, request):
        return 'hai'


    def get_query_GET(self, **kwargs):
        raise NotImplemented()


    def get_query_PUT(self, **kwargs):
        raise NotImplemented()


    def get_query_DELETE(self, **kwargs):
        raise NotImplemented()
