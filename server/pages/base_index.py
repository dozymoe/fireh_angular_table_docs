from functools import partial
from json import dumps as json_dump, loads as json_load
from twisted.internet.defer import inlineCallbacks, returnValue
from twisted.web.server import NOT_DONE_YET
from pages.base import BasePage
from utils.json import ComplexEncoder

class BaseIndexPage(BasePage):
    isLeaf = True

    @inlineCallbacks
    def async_render_GET(self, request):
        response_body = yield self.run_query_GET(request.args)
        request.setHeader('Content-Type', 'application/json')
        returnValue(json_dump(response_body, cls=ComplexEncoder).encode())


    def render_GET(self, request):
        d = self.async_render_GET(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    @inlineCallbacks
    def async_render_POST(self, request):
        submission = json_load(request.content.read().decode())
        response_body = yield self.run_query_POST(submission, request.args)
        request.setHeader('Content-Type', 'application/json')
        request.setResponseCode(201)
        returnValue(json_dump(response_body, cls=ComplexEncoder).encode())


    def render_POST(self, request):
        d = self.async_render_POST(request)
        d.addCallback(request.write)
        d.addErrback(partial(self.write_error, request))
        d.addBoth(lambda _: request.finish())
        return NOT_DONE_YET


    def run_query_GET(self, params):
        raise NotImplemented()


    def run_query_POST(self, submission, params):
        raise NotImplemented()
