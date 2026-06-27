# fastapiapp
## creating fast api application 


# CRUD operations
-create
-Read
-Update
-Delete

# Rest API
-GET
-POST
-PUT
-DELETE


# status code
-200 OK
-201 created
-204 No content
-400 Bad request
-402 Unauthorized
-403 Forbidden
-404 Not found 
-405 Method Not Allowed 
-409 conflict
-500 Internal server error




## modules
-sqlalchemy-orm(obj relational mapping )
-fastapi-- web framework
-uvicorn-- server for runniing fastapi
-application--`uvicorn app.main:app --reload`
-psycopg2 -- postgresql driver
-pydantics -- data validation
-typing extensions-- type hints

## concepts:
 ---orm (object relational mapping)-- to convert python code t0 sql commands without writing sql commands
 -----depends
    -- dependency injection-- to inject dependencies into route handlers
    
-------sessionmaker
            - to create a session with the database for a single request
    --declarative base 
            -to create a base class for all the models

    --session local 
            to create 