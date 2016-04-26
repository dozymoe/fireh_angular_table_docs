import logging
import sys

from txpostgres import txpostgres
from application import Application
from pages.root import RootPage

logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)

dbconn = txpostgres.Connection()
dbconn.connect('dbname=notes')

app = Application()
app.dbconn = dbconn
app.run(RootPage(app))
