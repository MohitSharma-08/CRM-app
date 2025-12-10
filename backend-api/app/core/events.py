from app.db.database import connect_db, disconnect_db

def create_start_app_handler(app):
    async def start_app():
        await connect_db()
    return start_app

def create_stop_app_handler(app):
    async def stop_app():
        await disconnect_db()
    return stop_app
