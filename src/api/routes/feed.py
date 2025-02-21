from flask import Blueprint, jsonify, request
from api.models import db, User, Skill, Match, MatchRequest, Conversation

feed_bp = Blueprint('feed_bp', __name__)

@feed_bp.route('/feed/<int:user_id>', methods=['GET'])
def get_feed(user_id):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    
    query = User.query.filter(User.id != user_id)
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)
    users = pagination.items
    
    feed = []
    
    for user in users:
        user_data = user.serialize()
        skills = Skill.query.filter_by(user_id=user.id).all()
        skills_data = [skill.serialize() for skill in skills]
        
        match = Match.query.filter(
            ((Match.user_1_id == user_id) & (Match.user_2_id == user.id)) |
            ((Match.user_1_id == user.id) & (Match.user_2_id == user_id))
        ).first()
        
        if match:
            match_status = "matched"
        else:
            match_request = MatchRequest.query.filter(
                ((MatchRequest.sender_user_id == user_id) & (MatchRequest.receiver_user_id == user.id)) |
                ((MatchRequest.sender_user_id == user.id) & (MatchRequest.receiver_user_id == user_id))
            ).first()
            if match_request:
                match_status = "pending"
            else:
                match_status = "idle"
        
        conversation = Conversation.query.filter(
            ((Conversation.user_1_id == user_id) & (Conversation.user_2_id == user.id)) |
            ((Conversation.user_1_id == user.id) & (Conversation.user_2_id == user_id))
        ).first()
        
        conversation_id = conversation.id if conversation else False
        
        feed.append({
            "user": user_data,
            "skills": skills_data,
            "match_status": match_status,
            "conversation": conversation_id
        })
    
    return jsonify({
        "feed": feed,
        "page": pagination.page,
        "per_page": pagination.per_page,
        "total": pagination.total,
        "pages": pagination.pages,
    }), 200
