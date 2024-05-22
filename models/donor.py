#!/usr/bin/python3
""" holds class donor"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer
from hashlib import md5


class Donor(BaseModel, Base):
    """Representation of a donor """
    if models.storage_t == 'db':
        __tablename__ = 'donors'
        name = Column(String(128), nullable=False)
        phone_number = Column(String(20), nullable=False)
        gender = Column(String(10), nullable=False)
        blood_group = Column(String(4), nullable=False)
        age = Column(Integer, nullable=False)
        WilayaID = Column(Integer, nullable=False)
        BaladyaID = Column(Integer, nullable=False)


    def __init__(self, *args, **kwargs):
        """initializes donor"""
        super().__init__(*args, **kwargs)


    def __setattr__(self, name, value):
        """sets a password with md5 encryption"""
        if name == "password":
            value = md5(value.encode()).hexdigest()
        super().__setattr__(name, value)

