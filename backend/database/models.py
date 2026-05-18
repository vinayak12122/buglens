from sqlalchemy import Column, String, DateTime, ForeignKey, Text, text, Index, BigInteger, func,UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=text("now()"), nullable=False)

    __table_args__ = (
        Index('idx_users_email_lower', func.lower(email)),
    )


# ================= PROJECTS =================

class Project(Base):
    __tablename__ = "projects"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    name = Column(String(100), nullable=False)
    website_url = Column(String(255), nullable=True)

    project_id = Column(String(50), unique=True, nullable=False, index=True)

    public_key = Column(String(100), nullable=False, unique=True, index=True)

    created_at = Column(DateTime(timezone=True), server_default=text("now()"), nullable=False)

    __table_args__ = (
        Index('idx_projects_user_id', 'user_id'),
    )


class Issue(Base):
    __tablename__ = "issues"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))
    project_id = Column(String(50), ForeignKey("projects.project_id", ondelete="CASCADE"), nullable=False)
    fingerprint = Column(String(64), nullable=False)
    title = Column(Text, nullable=False)
    count = Column(BigInteger, server_default=text("0"), nullable=False)
    status = Column(String(20), server_default=text("'unresolved'"), nullable=False)
    severity = Column(String(20), server_default=text("'error'"), nullable=False)
    first_seen = Column(DateTime(timezone=True), server_default=text("now()"), nullable=False)
    last_seen = Column(DateTime(timezone=True), server_default=text("now()"), nullable=False)
    latest_message = Column(Text)
    latest_stack = Column(Text)
    latest_page = Column(String(255))
    latest_browser = Column(String(100))
    latest_payload = Column(JSONB)

    __table_args__ = (
        Index("uq_project_fingerprint", "project_id", "fingerprint", unique=True),
        Index("idx_issues_project_status", "project_id", "status"),
        Index("idx_issues_last_seen", "last_seen"),
    )

class Log(Base):
    __tablename__ = "logs"

    id = Column(UUID(as_uuid=True), primary_key=True, server_default=text("uuidv7()"))

    project_id = Column(String(50), ForeignKey("projects.project_id", ondelete="CASCADE"), nullable=False)

    issue_id = Column(UUID(as_uuid=True), ForeignKey("issues.id", ondelete="SET NULL"), nullable=True)

    type = Column(String(50), nullable=False)

    message = Column(Text, nullable=False)

    page = Column(String(255), nullable=True)

    browser = Column(String(100), nullable=True)

    stack = Column(Text, nullable=True)

    payload = Column(JSONB, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=text("now()"), nullable=False)

    __table_args__ = (
        Index("idx_logs_project_created", "project_id", "created_at"),
        Index("idx_logs_issue_created", "issue_id", "created_at"),
    )