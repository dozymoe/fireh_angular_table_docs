"""counts insert countries total

Revision ID: cf31f8e10ef0
Revises: 8ffd7c20ad02
Create Date: 2016-04-28 02:25:22.461737

"""

# revision identifiers, used by Alembic.
revision = 'cf31f8e10ef0'
down_revision = '8ffd7c20ad02'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.execute("insert into counts(name,value) values('countries_total', 249)")


def downgrade():
    op.execute("delete from counts where name = 'countries_total'")
