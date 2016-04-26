import logging
import os

from twisted.internet import reactor
from twisted.web.server import Site

log = logging.getLogger(__file__)

class Application(object):

    dbconn = None

    def run(self, root_page):
        root_dir = os.environ['PACKAGE_ROOT_DIR']

        site = Site(root_page)
        reactor.listenUNIX(os.path.join(root_dir, 'run', 'twisted.0.sock'),
                site)
        reactor.run()
