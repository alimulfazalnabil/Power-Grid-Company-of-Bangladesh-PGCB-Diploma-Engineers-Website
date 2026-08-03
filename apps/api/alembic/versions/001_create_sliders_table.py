"""create sliders table

Revision ID: 001_create_sliders
Revises:
Create Date: 2026-08-04
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers
revision = "001_create_sliders"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS pgcrypto")

    op.create_table(
        "sliders",

        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
            server_default=sa.text("gen_random_uuid()"),
        ),

        sa.Column(
            "title",
            sa.String(length=255),
            nullable=False,
        ),

        sa.Column(
            "subtitle",
            sa.String(length=500),
            nullable=False,
        ),

        sa.Column(
            "description",
            sa.String(length=2000),
            nullable=False,
            server_default="",
        ),

        sa.Column(
            "image_url",
            sa.String(length=500),
            nullable=False,
        ),

        sa.Column(
            "button_text",
            sa.String(length=100),
            nullable=False,
            server_default="Learn More",
        ),

        sa.Column(
            "button_url",
            sa.String(length=255),
            nullable=False,
            server_default="/",
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
            "starts_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),

        sa.Column(
            "ends_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),

        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),

        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),

        sa.Column(
            "deleted_at",
            sa.DateTime(timezone=True),
            nullable=True,
        ),

        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_slider_active",
        "sliders",
        ["is_active"],
    )

    op.create_index(
        "ix_slider_sort",
        "sliders",
        ["sort_order"],
    )

    op.create_index(
        "ix_slider_publish",
        "sliders",
        ["starts_at", "ends_at"],
    )

    op.create_index(
        "ix_slider_title",
        "sliders",
        ["title"],
    )

    op.create_index(
        "ix_slider_created_at_desc",
        "sliders",
        ["created_at"],
    )

    op.create_index(
        "ix_slider_active_sort",
        "sliders",
        ["is_active", "sort_order"],
    )

    op.create_index(
        "uq_slider_sort_order_active",
        "sliders",
        ["sort_order"],
        unique=True,
        postgresql_where=sa.text("deleted_at IS NULL"),
    )


def downgrade() -> None:

    op.drop_index("uq_slider_sort_order_active", table_name="sliders")

    op.drop_index("ix_slider_active_sort", table_name="sliders")

    op.drop_index("ix_slider_created_at_desc", table_name="sliders")

    op.drop_index("ix_slider_title", table_name="sliders")

    op.drop_index("ix_slider_publish", table_name="sliders")

    op.drop_index("ix_slider_sort", table_name="sliders")

    op.drop_index("ix_slider_active", table_name="sliders")

    op.drop_table("sliders")