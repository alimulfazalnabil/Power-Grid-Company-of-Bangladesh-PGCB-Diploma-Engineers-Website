"""create notice management tables

Revision ID: 002_create_notice_tables
Revises: 002
Create Date: 2026-08-04

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "002_create_notice_tables"
down_revision = "002"
branch_labels = None
depends_on = None

notice_status = postgresql.ENUM(
    "DRAFT",
    "REVIEW",
    "PUBLISHED",
    "ARCHIVED",
    name="noticestatus",
)


def upgrade():

    notice_status.create(op.get_bind())

    op.create_table(
        "notice_categories",

        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
        ),

        sa.Column(
            "name",
            sa.String(100),
            nullable=False,
        ),

        sa.Column(
            "slug",
            sa.String(120),
            nullable=False,
        ),

        sa.Column(
            "description",
            sa.String(500),
        ),

        sa.Column(
            "color",
            sa.String(20),
            nullable=False,
        ),

        sa.Column(
            "icon",
            sa.String(100),
        ),

        sa.Column(
            "sort_order",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),

        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default=sa.true(),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "deleted_at",
            sa.DateTime(timezone=True),
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_notice_category_slug",
        "notice_categories",
        ["slug"],
        unique=True,
    )

    op.create_table(
        "notices",

        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
        ),

        sa.Column(
            "title",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "slug",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "summary",
            sa.String(500),
            nullable=False,
        ),

        sa.Column(
            "content",
            sa.Text(),
            nullable=False,
        ),

        sa.Column(
            "thumbnail",
            sa.String(500),
        ),

        sa.Column(
            "status",
            notice_status,
            nullable=False,
        ),

        sa.Column(
            "category_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),

        sa.Column(
            "author_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),

        sa.Column(
            "is_featured",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),

        sa.Column(
            "allow_comments",
            sa.Boolean(),
            nullable=False,
            server_default=sa.false(),
        ),

        sa.Column(
            "view_count",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),

        sa.Column(
            "published_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "expires_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "deleted_at",
            sa.DateTime(timezone=True),
        ),

        sa.ForeignKeyConstraint(
            ["category_id"],
            ["notice_categories.id"],
        ),

        sa.ForeignKeyConstraint(
            ["author_id"],
            ["users.id"],
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_notice_slug",
        "notices",
        ["slug"],
        unique=True,
    )

    op.create_index(
        "ix_notice_status",
        "notices",
        ["status"],
    )

    op.create_index(
        "ix_notice_featured",
        "notices",
        ["is_featured"],
    )

    op.create_index(
        "ix_notice_published",
        "notices",
        ["published_at"],
    )

    op.create_table(
        "notice_attachments",

        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
        ),

        sa.Column(
            "notice_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),

        sa.Column(
            "original_name",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "stored_name",
            sa.String(255),
            nullable=False,
        ),

        sa.Column(
            "file_url",
            sa.String(1000),
            nullable=False,
        ),

        sa.Column(
            "mime_type",
            sa.String(100),
            nullable=False,
        ),

        sa.Column(
            "extension",
            sa.String(20),
            nullable=False,
        ),

        sa.Column(
            "file_size",
            sa.BigInteger(),
            nullable=False,
        ),

        sa.Column(
            "download_count",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
        ),

        sa.Column(
            "deleted_at",
            sa.DateTime(timezone=True),
        ),

        sa.ForeignKeyConstraint(
            ["notice_id"],
            ["notices.id"],
            ondelete="CASCADE",
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_attachment_notice",
        "notice_attachments",
        ["notice_id"],
    )


def downgrade():

    op.drop_table("notice_attachments")

    op.drop_table("notices")

    op.drop_table("notice_categories")

    notice_status.drop(op.get_bind())