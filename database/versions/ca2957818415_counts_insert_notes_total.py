"""counts insert notes_total

Revision ID: ca2957818415
Revises: 2cab09cd491d
Create Date: 2016-04-27 04:12:14.101766

"""

# revision identifiers, used by Alembic.
revision = 'ca2957818415'
down_revision = '2cab09cd491d'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.execute("insert into counts(name,value) values('notes_total', 0)")


def downgrade():
    op.execute("delete from counts where name = 'notes_total'")
