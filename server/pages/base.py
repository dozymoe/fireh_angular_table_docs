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
        request.setResponseCode(500)
        try:
            failure.raiseException()
        except:
            log.exception('Failed to serve page %s' % request.uri.decode())


    def get_pager(self, params, total_items):
        pageSize = int(params.get(b'pageSize', ['20'])[0])
        page = int(params.get(b'page', ['1'])[0]) - 1

        if page < 0:
            page = 0
        if page * pageSize > total_items:
            if total > 0:
                page = (total_items - 1) / pageSize
            else:
                page = 0
        return (page, pageSize)


    def get_sql_filter_by_clause(self, params, allowed_keys):
        filter_by = []
        for key, type_ in allowed_keys:
            filter_name = ('filterBy' + key.capitalize()).encode()
            if not filter_name in params:
                continue

            params_filter_by = []
            for filter_ in params[filter_name]:
                params_filter_by.extend(x.strip() for x in filter_.decode().split(','))

            filter_ = []
            for value in params_filter_by:
                if len(value) == 0:
                    continue
                elif type_ is str:
                    filter_.append("%s like '%%%s%%'" % (key, value))
                else:
                    try:
                        value = type_(value)
                        filter_.append('%s = %s' % (key, value))
                    except ValueError:
                        pass
            if len(filter_) == 1:
                filter_by.append(filter_[0])
            elif len(filter_) > 1:
                filter_by.append('(' + ' or '.join(filter_) + ')')

        if len(filter_by):
            return ' and '.join(filter_by)
        return ''


    def get_sql_order_by_clause(self, params, allowed_keys):
        if not b'orderBy' in params:
            return ''

        params_order_by = []
        for sort in params[b'orderBy']:
            params_order_by.extend(x.strip() for x in sort.decode().split(','))

        order_by = []
        for sort in params_order_by:
            if sort.startswith('-'):
                direction = 'desc'
                sort = sort[1:]
            else:
                direction = 'asc'
            if not sort in allowed_keys:
                continue
            order_by.append('%s %s' % (sort, direction))

        if len(order_by):
            return ' order by ' + ','.join(order_by)
        return ''
