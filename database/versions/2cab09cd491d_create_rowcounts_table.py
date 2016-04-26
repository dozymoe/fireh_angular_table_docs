"""create rowcounts table

Revision ID: 2cab09cd491d
Revises: 22cef2790c53
Create Date: 2016-04-27 00:38:39.659881

"""

# revision identifiers, used by Alembic.
revision = '2cab09cd491d'
down_revision = '22cef2790c53'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'counts',
        sa.Column('name', sa.String(50), primary_key=True),
        sa.Column('value', sa.Integer, default=0, nullable=False),
    )


def downgrade():
    op.drop_table('counts')
