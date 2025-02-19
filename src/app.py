"""
This module starts the API Server, loads the DB, and adds endpoints.
"""
import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands
from api.routes.signup import signup_bp
from api.routes.login import login_bp
from api.routes.verify import verify_bp
from api.routes.user import user_bp
from api.routes.conversation import conversation_bp
from api.routes.messages import messages_bp
from api.routes.skill import skills_bp
from api.routes.feed import feed_bp
from api.routes.logout import logout_bp
from api.routes.match_request import match_requests_bp
from api import models

# Configuration
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
STATIC_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Initialize Flask app
app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, supports_credentials=True, origins=["*"])

# Database configuration
db_url = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://") if db_url else "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT configuration
app.config['JWT_SECRET_KEY'] = "mi-clave-super-secreta"

# Initialize database and migrations
db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)

# Setup admin and commands
setup_admin(app)
setup_commands(app)

# Register Blueprints
app.register_blueprint(signup_bp, url_prefix='/api')
app.register_blueprint(login_bp, url_prefix='/api')
app.register_blueprint(logout_bp, url_prefix='/api')
app.register_blueprint(verify_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
app.register_blueprint(skills_bp, url_prefix='/api')
app.register_blueprint(conversation_bp, url_prefix='/api')
app.register_blueprint(messages_bp, url_prefix='/api')
app.register_blueprint(feed_bp, url_prefix='/api')
app.register_blueprint(match_requests_bp, url_prefix='/api')


# Error handling
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap
@app.route('/')
def sitemap():
    return generate_sitemap(app) if ENV == "development" else send_from_directory(STATIC_DIR, 'index.html')

# Serve static files
@app.route('/<path:path>', methods=['GET'])
def serve_static_file(path):
    file_path = os.path.join(STATIC_DIR, path)
    if not os.path.isfile(file_path):
        path = 'index.html'
    response = send_from_directory(STATIC_DIR, path)
    response.cache_control.max_age = 0  # Avoid cache
    return response

# Run the app
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
