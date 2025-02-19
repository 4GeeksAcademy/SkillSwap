import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_admin.form import Select2Widget
from wtforms_sqlalchemy.fields import QuerySelectField
from werkzeug.security import generate_password_hash
from .models import db, User, Skill, Match, Message, Conversation, Videocall, MatchRequest

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class UserAdmin(ModelView):
        column_searchable_list = ('name', 'last_name', 'email')
        column_filters = ('is_active',)

        def on_model_change(self, form, model, is_created):
            if form.password.data:
                model.password = generate_password_hash(form.password.data)

    class SkillAdmin(ModelView):
        column_list = ('id', 'user_id', 'skill_type', 'skill_category', 'skill_subcategory')
        form_columns = ('user_id', 'skill_type', 'skill_category', 'skill_subcategory')
        form_overrides = {
            'user_id': QuerySelectField
        }
        form_args = {
            'user_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            }
        }

    class MatchAdmin(ModelView):
        column_list = ('id', 'user_1_id', 'user_2_id', 'match_date')
        form_columns = ('user_1_id', 'user_2_id')
        form_overrides = {
            'user_1_id': QuerySelectField,
            'user_2_id': QuerySelectField
        }
        form_args = {
            'user_1_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            },
            'user_2_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            }
        }

    class MatchRequestAdmin(ModelView):
        column_list = ('id', 'sender_user_id', 'receiver_user_id', 'match_request_date')
        form_columns = ('sender_user_id', 'receiver_user_id')
        form_overrides = {
            'sender_user_id': QuerySelectField,
            'receiver_user_id': QuerySelectField
        }
        form_args = {
            'sender_user_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            },
            'receiver_user_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            }
        }

    class ConversationAdmin(ModelView):
        column_list = ('id', 'user_1_id', 'user_2_id', 'conversation_date')
        form_columns = ('user_1_id', 'user_2_id')
        form_overrides = {
            'user_1_id': QuerySelectField,
            'user_2_id': QuerySelectField
        }
        form_args = {
            'user_1_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            },
            'user_2_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            }
        }

    class MessageAdmin(ModelView):
        column_list = ('id', 'conversation_id', 'sender_id', 'message_text', 'message_date')
        form_columns = ('conversation_id', 'sender_id', 'message_text')
        form_overrides = {
            'conversation_id': QuerySelectField,
            'sender_id': QuerySelectField
        }
        form_args = {
            'conversation_id': {
                'query_factory': lambda: Conversation.query,
                'allow_blank': False,
                'get_label': lambda c: f"Chat {c.id} entre {c.user_1_id} y {c.user_2_id}"
            },
            'sender_id': {
                'query_factory': lambda: User.query,
                'allow_blank': False,
                'get_label': lambda u: f"{u.name} {u.last_name} ({u.email})"
            }
        }

    class VideocallAdmin(ModelView):
        column_list = ('id', 'conversation_id', 'duration', 'videocall_date')
        form_columns = ('conversation_id', 'duration')
        form_overrides = {
            'conversation_id': QuerySelectField
        }
        form_args = {
            'conversation_id': {
                'query_factory': lambda: Conversation.query,
                'allow_blank': False,
                'get_label': lambda c: f"Chat {c.id} entre {c.user_1_id} y {c.user_2_id}"
            }
        }

    admin.add_view(UserAdmin(User, db.session))
    admin.add_view(SkillAdmin(Skill, db.session))
    admin.add_view(MatchAdmin(Match, db.session))
    admin.add_view(MatchRequestAdmin(MatchRequest, db.session))
    admin.add_view(ConversationAdmin(Conversation, db.session))
    admin.add_view(MessageAdmin(Message, db.session))
    admin.add_view(VideocallAdmin(Videocall, db.session))
