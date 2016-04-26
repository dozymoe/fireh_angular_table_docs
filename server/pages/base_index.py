from functools import partial
from json import dumps as json_dump
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.web.server import NOT_DONE_YET
from pages.base import BasePage

class BaseIndexPage(BasePage):
    isLeaf = True

    @inlineCallbacks
    def async_render_GET(self, request):
        response_body = yield self.get_query_GET()
        request.setHeader('Content-Type', 'application/json')
        returnValue(json_dump(response_body).encode())


    def render_GET(self, request):
        d = self.async_render_GET(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    @inlineCallbacks
    def async_render_POST(self, request):
        yield
        request.setHeader('Content-Type', 'application/json')
        returnValue('hai'.encode())


    def render_POST(self, request):
        d = self.async_render_POST(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    def get_query_GET(self, **kwargs):
        raise NotImplemented()


    def get_query_POST(self, **kwargs):
        raise NotImplemented()
