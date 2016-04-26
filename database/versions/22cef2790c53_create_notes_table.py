"""create notes table

Revision ID: 22cef2790c53
Revises: 
Create Date: 2016-04-27 00:13:54.285835

"""

# revision identifiers, used by Alembic.
revision = '22cef2790c53'
down_revision = None
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table(
        'notes',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('author', sa.Unicode(50), nullable=False),
        sa.Column('title', sa.Unicode(50), nullable=False),
        sa.Column('body', sa.Unicode(250)),
        sa.Column('created_at', sa.DateTime, nullable=False),
        sa.Column('modified_at', sa.DateTime, nullable=False),
        sa.Index('note_author', 'author'),
        sa.Index('note_title', 'title'),
        sa.Index('note_created_at', 'created_at'),
    )


def downgrade():
    op.drop_table('notes')
