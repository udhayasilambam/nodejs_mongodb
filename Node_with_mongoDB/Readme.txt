For cmd 'nodemon run start' 
For terminal 'npm start'
used NPM package 
    1)nodemon
    2)mongoose
    3)express

Tech stack: Nodejs,MongoDB

API:
    Student:-
        {
            get all student  :- student/all - request : get;
            get individual   :- student/:id - request : get;
            update (put)     :- student/:id - request : put;
            save             :- student/ - request : post;
        }
    parents:-
        {
            get all parents  :- parents/all - request : get;
            get individual   :- parents/:id - request : get;
            update (put)     :- parents/:id - request : put;
            save             :- parents/ - request : post;
        }
    class:-
        {
            get all class    :- class/ - request : get;
            update (put)     :- class/:id - request : put;
            save             :- class/ - request : post;
        }

