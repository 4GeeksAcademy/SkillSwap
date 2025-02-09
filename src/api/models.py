from flask_sqlalchemy import SQLAlchemy
import enum

class SkillType(enum.Enum):
    LOOKING_FOR = "Looking For"
    OFFERING = "Offering"

class SkillCategory(enum.Enum):
    ART = "Art"
    DESIGN = "Design"
    DEVELOPMENT = "Development"
    MARKETING = "Marketing"
    MUSIC = "Music"
    PHOTOGRAPHY = "Photography"
    VIDEO = "Video"
    WRITING = "Writing"
    OTHER = "Other"

class SkillSubcategory(enum.Enum):
    GRAPHIC_DESIGN = "Graphic Design"
    ILLUSTRATION = "Illustration"
    MOTION_GRAPHICS = "Motion Graphics"
    WEB_DESIGN = "Web Design"
    UX_UI = "UX/UI"
    FRONTEND = "Frontend"
    BACKEND = "Backend"
    FULLSTACK = "Fullstack"
    MOBILE = "Mobile"
    SEO = "SEO"
    SOCIAL_MEDIA = "Social Media"
    EMAIL_MARKETING = "Email Marketing"
    COPYWRITING = "Copywriting"
    SONGWRITING = "Songwriting"
    COMPOSING = "Composing"
    PRODUCTION = "Production"
    MIXING_MASTERING = "Mixing/Mastering"
    PHOTOGRAPHY = "Photography"
    VIDEO_EDITING = "Video Editing"
    SCREENWRITING = "Screenwriting"
    BLOGGING = "Blogging"
    GHOSTWRITING = "Ghostwriting"
    OTHER = "Other"

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(), unique=False, nullable=False, default=db.func.now())
    profile_pic_src = db.Column(db.String(120), unique=False, nullable=True)
    description = db.Column(db.String(255), unique=False, nullable=True)
    is_visible = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "created_at": self.created_at,
            "profile_pic_src": self.profile_pic_src,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }

class Skill(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_type = db.Column(db.Enum(SkillType), unique=False, nullable=False)
    skill_category = db.Column(db.Enum(SkillCategory), unique=False, nullable=False)
    skill_subcategory = db.Column(db.Enum(SkillSubcategory), unique=False, nullable=False)

    def __repr__(self):
        return f'<Skill {self.skill_type}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "skill_type": self.skill_type,
            "skill_category": self.skill_category,
            "skill_subcategory": self.skill_subcategory
        }


class Match(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user_1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    match_date = db.Column(db.DateTime(), unique=False, nullable=False, default=db.func.now())

    def __repr__(self):
        return f'<Match {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_1_id": self.user_1_id,
            "user_2_id": self.user_2_id,
            "match_date": self.match_date
        }

class Conversation(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    user_1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user_2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    conversation_date = db.Column(db.DateTime(), unique=False, nullable=False, default=db.func.now())

    def __repr__(self):
        return f'<Conversation {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_1_id": self.user_1_id,
            "user_2_id": self.user_2_id,
            "conversation_date": self.conversation_date
        }
    
class Message(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message_text = db.Column(db.String(255), unique=False, nullable=False)
    message_date = db.Column(db.DateTime(), unique=False, nullable=False, default=db.func.now())

    def __repr__(self):
        return f'<Message {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "sender_id": self.sender_id,
            "message_text": self.message_text,
            "message_date": self.message_date
        }

class Videocall(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)
    duration = db.Column(db.String(120), unique=False, nullable=False)
    videocall_date = db.Column(db.DateTime(), unique=False, nullable=False, default=db.func.now())

    def __repr__(self):
        return f'<Videocall {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "duration": self.duration,
            "videocall_date": self.videocall_date
        }
