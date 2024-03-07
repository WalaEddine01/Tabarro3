#!/usr/bin/python3
"""
initialize the models package
"""

storage_t = "db"
from models.engine.db_storage import DBStorage
storage = DBStorage()
storage.reload()
