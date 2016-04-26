import logging

from twisted.web.resource import Resource

log = logging.getLogger(__file__)

class BasePage(Resource):

    isLeaf = False
    app = None

    def __init__(self, app):
        super().__init__()
        self.app = app


    def write_error(self, request, failure):
        request.setResponseCode(500, b'Server error')
        try:
            failure.raiseException()
        except:
            log.exception('Failed to serve page %s' % request.uri.decode())
