import logging
import os
import sys

from txpostgres import txpostgres
from yaml import safe_load as yaml_load
from application import Application
from pages.root import RootPage

logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)

ROOT_DIR = os.environ['PACKAGE_ROOT_DIR']
connstr = []
with open(os.path.join(ROOT_DIR, 'etc', 'database.yml')) as f:
    dbdata = yaml_load(f)
    if 'username' in dbdata:
        connstr.append('user=' + dbdata['username'])
    if 'password' in dbdata:
        connstr.append('password=' + dbdata['password'])
    if 'host' in dbdata:
        connstr.append('host=' + dbdata['host'])
    if 'port' in dbdata:
        connstr.append('port=' + dbdata['port'])
    connstr.append('dbname=' + dbdata['dbname'])

dbconn = txpostgres.Connection()
dbconn.connect(','.join(connstr))

app = Application()
app.dbconn = dbconn
app.run(RootPage(app))
