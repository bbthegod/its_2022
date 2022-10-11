db = db.getSiblingDB('itsupporter');

db.createCollection('users');

db.users.insertMany([
  {
    "_id": ObjectId("63457db9a70e578dacbc4b29"),
    "studentCode": "admin",
    "studentName": "admin",
    "studentClass": "HTTT1-K12",
    "studentPhone": "0123456789",
    "password": "$2b$10$.fk..fBDMWtl5FpnN4lgEeJLM9ENLq.qtyRtAmTq6VhOMAhqPUY1C",
    "role": "admin",
    "isOnline": false,
    "status": NumberInt(0),
    "createdAt": ISODate("2022-10-11T14:29:13.334+0000"),
    "updatedAt": ISODate("2022-10-11T14:29:13.334+0000"),
    "__v": NumberInt(0)
  }
]);

db.createCollection('questions');

db.questions.insertMany([
  {
    "_id": ObjectId("63457e303c8646b1142f7698"),
    "content": "1+1=?",
    "options": [
      {
        "numbering": NumberInt(1),
        "answer": "1",
        "_id": ObjectId("63457e303c8646b1142f7699")
      },
      {
        "numbering": NumberInt(2),
        "answer": "2",
        "_id": ObjectId("63457e303c8646b1142f769a")
      },
      {
        "numbering": NumberInt(3),
        "answer": "3",
        "_id": ObjectId("63457e303c8646b1142f769b")
      },
      {
        "numbering": NumberInt(4),
        "answer": "4",
        "_id": ObjectId("63457e303c8646b1142f769c")
      }
    ],
    "correctAnswer": NumberInt(2),
    "createdAt": ISODate("2022-10-11T14:31:12.625+0000"),
    "updatedAt": ISODate("2022-10-11T14:31:12.625+0000"),
    "__v": NumberInt(0)
  }
])