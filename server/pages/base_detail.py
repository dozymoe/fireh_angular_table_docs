from functools import partial
from json import dumps as json_dump, loads as json_load
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.web.server import NOT_DONE_YET
from pages.base import BasePage
from utils.json import ComplexEncoder

class BaseDetailPage(BasePage):

    isLeaf = True
    id_ = None

    def __init__(self, app, id_):
        super().__init__(app)
        self.id_ = id_


    @inlineCallbacks
    def async_render_GET(self, request):
        response_body = yield self.run_query_GET(request.args)
        if response_body is None:
            request.setResponseCode(404)
            returnValue(b'')

        request.setHeader('Content-Type', 'application/json')
        returnValue(json_dump(response_body, cls=ComplexEncoder).encode())


    def render_GET(self, request):
        d = self.async_render_GET(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    @inlineCallbacks
    def async_render_PUT(self, request):
        submission = json_load(request.content.read().decode())
        response_body = yield self.run_query_PUT(submission, request.args)
        if response_body is None:
            request.setResponseCode(404)
            returnValue(b'')

        request.setHeader('Content-Type', 'application/json')
        returnValue(json_dump(response_body, cls=ComplexEncoder).encode())


    def render_PUT(self, request):
        d = self.async_render_PUT(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    @inlineCallbacks
    def async_render_DELETE(self, request):
        result = yield self.run_query_DELETE(request.args)
        if result:
            request.setResponseCode(204)
        else:
            request.setResponseCode(404)


    def render_DELETE(self, request):
        d = self.async_render_DELETE(request)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    def run_query_GET(self, params):
        raise NotImplemented()


    def run_query_PUT(self, submission, params):
        raise NotImplemented()


    def run_query_DELETE(self, params):
        raise NotImplemented()
