# :triangular_flag_on_post: Holberton B&B

<img align="center" src="https://i.ibb.co/d5N85Nh/hbnb.png" width="100%">

### Welcome to the AirBnB clone project! (Holberton B&B)

After 4 months, we have a complete web application composed by:

- A command interpreter to manipulate data without a visual interface, like in a Shell (perfect for development and debugging)
- A website (the front-end) that shows the final product to everybody: static and dynamic
- A database or files that store data (data = objects)
- An API that provides a communication interface between the front-end and your data (retrieve, create, delete, update them)

## Final product

<img align="center" src="https://s3.amazonaws.com/intranet-projects-files/holbertonschool-higher-level_programming+/268/8-index.png" width="100%">

<img align="center" src="https://s3.amazonaws.com/intranet-projects-files/holbertonschool-higher-level_programming+/268/100-index.png" width="100%">

## Description

Project attempts to clone the the AirBnB application and website, including the
database, storage, RESTful API, Web Framework, and Front End.  Currently the
application is designed to run with 2 storage engine models:

* File Storage Engine:

  * `/models/engine/file_storage.py`

* Database Storage Engine:

  * `/models/engine/db_storage.py`

  * To Setup the DataBase for testing and development, there are 2 setup
  scripts that setup a database with certain privileges: `setup_mysql_test.sql`
  & `setup_mysql_test.sql` (for more on setup, see below).

  * The Database uses Environmental Variables for tests.  To execute tests with
  the environmental variables prepend these declarations to the execution
  command:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
[COMMAND HERE]
```

### Installation
* Clone this repository: `git clone https://github.com/guxal/AirBnB_clone_v4.git`
* Access AirBnb directory: `cd AirBnB_clone`
* Run hbnb(interactively): `./console` and enter command
* Run hbnb(non-interactively): `echo "<command>" | ./console.py`

### Whats a command interpreter?

Do you remember the Shell? Its exactly the same but limited to a specific use-case. In our case, we want to be able to manage the objects of our project:

- Create a new object (ex: a new User or a new Place)
- Retrieve an object from a file, a database etc
- Do operations on objects (count, compute stats, etc)
- Update attributes of an object
- Destroy an object

### HBNBCommand

This is the console (command interpreter) for the Holberton Airbnb clone project. The console can be used to store objects in and retrieve objects from a JSON.

Supported classes:
- BaseModel
- User
- State
- City
- Amenity
- Place
- Review

## Data diagram

<img align="center" src="https://s3.amazonaws.com/intranet-projects-files/holbertonschool-higher-level_programming+/289/AirBnb_DB_diagramm.jpg" width="100%">

### Commands

These are some of the commands implemented in our console (HBNBCommand):

| Command | Description |
| ------ | ------ |
| all | Prints all string representation of all instances based or not on the class name |
| create | Creates a new instance of class name, saves it (to the JSON file) and prints the id |
| destroy | Deletes an instance based on the class name and id (save the change into the JSON file) |
| help | List available commands with "help" or detailed help with "help cmd" |
| quit - EOF | Commands to exit the program |
| show | Prints the string representation of an instance based on the class name and id |
| update | Updates an instance based on the class name and id by adding or updating attribute (save the change into the JSON file) |

To start, navigate to the project folder and enter `./console.py` in the shell.

| Examples of how to use the commands |
| ------ |
| Create: |
| `create <class name>` Ex: `create BaseModel` |
| Show: |
| `show <class name> <object id>` Ex: `show User my_id` |
| Destroy: |
| `destroy <class name> <object id>` Ex: `destroy Place my_place_id` |
| All: |
| `all` or `all <class name>` Ex: `all` or `all State` |
| Quit: |
| `quit` or `EOF (Ctrl-d)` |
| Help: |
| `help` or `help <command>` Ex: `help` or `help all` |
| Additionally, the console supports: |
| `<class name>.<command>(<parameters>)` syntax. Ex: `City.show(my_city_id)` |

## Environment

* __OS:__ Ubuntu 14.04 LTS
* __language:__ Python 3.4.3
* __web server:__ nginx/1.4.6
* __application server:__ Flask 0.12.2, Jinja2 2.9.6
* __web server gateway:__ gunicorn (version 19.7.1)
* __database:__ mysql Ver 14.14 Distrib 5.7.18
* __documentation:__ Swagger (flasgger==0.6.6)
* __style:__
  * __python:__ PEP 8 (v. 1.7.0)
  * __web static:__ [W3C Validator](https://validator.w3.org/)
  * __bash:__ ShellCheck 0.3.3

<img align="center" src="https://github.com/jarehec/AirBnB_clone_v3/blob/master/dev/hbnb_step5.png" width="100%">

## Configuration Files

The `/config/` directory contains configuration files for `nginx` and the
Upstart scripts.  The nginx configuration file is for the configuration file in
the path: `/etc/nginx/sites-available/default`.  The enabled site is a sym link
to that configuration file.  The upstart script should be saved in the path:
`/etc/init/[FILE_NAME.conf]`.  To begin this service, execute:

```
$ sudo start airbnb.conf
```
This script's main task is to execute the following `gunicorn` command:

```
$ gunicorn --bind 127.0.0.1:8001 wsgi.wsgi:web_flask.app
```

The `gunicorn` command starts an instance of a Flask Application.

---

### Web Server Gateway Interface (WSGI)

All integration with gunicorn occurs with `Upstart` `.conf` files.  The python
code for the WSGI is listed in the `/wsgi/` directory.  These python files run
the designated Flask Application.

## Setup

This project comes with various setup scripts to support automation, especially
during maintanence or to scale the entire project.  The following files are the
setupfiles along with a brief explanation:

* **`dev/setup.sql`:** Drops test and dev databases, and then reinitializes
the datbase.

  * Usage: `$ cat dev/setup.sql | mysql -uroot -p`

* **`setup_mysql_dev.sql`:** initialiezs dev database with mysql for testing

  * Usage: `$ cat setup_mysql_dev.sql | mysql -uroot -p`

* **`setup_mysql_test.sql`:** initializes test database with mysql for testing

  * Usage: `$ cat setup_mysql_test.sql | mysql -uroot -p`

* **`0-setup_web_static.sh`:** sets up nginx web server config file & the file
  structure.

  * Usage: `$ sudo ./0-setup_web_static.sh`

* **`3-deploy_web_static.py`:** uses 2 functions from (1-pack_web_static.py &
  2-do_deploy_web_static.py) that use the fabric3 python integration, to create
  a `.tgz` file on local host of all the local web static fils, and then calls
  the other function to deploy the compressed web static files.  Command must
  be executed from the `AirBnB_clone` root directory.

  * Usage: `$ fab -f 3-deploy_web_static.py deploy -i ~/.ssh/holberton -u ubuntu`

## Testing

### `unittest`

This project uses python library, `unittest` to run tests on all python files.
All unittests are in the `./tests` directory with the command:

* File Storage Engine Model:

  * `$ python3 -m unittest discover -v ./tests/`

* DataBase Storage Engine Model

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
python3 -m unittest discover -v ./tests/
```

---

### All Tests

The bash script `init_test.sh` executes all these tests for both File Storage &
DataBase Engine Models:

  * checks `pep8` style

  * runs all unittests

  * runs all w3c_validator tests

  * cleans up all `__pycache__` directories and the storage file, `file.json`

  * **Usage `init_test.sh`:**

```
$ ./dev/init_test.sh
```

---

### CLI Interactive Tests

* This project uses python library, `cmd` to run tests in an interactive command
  line interface.  To begin tests with the CLI, run this script:

#### File Storage Engine Model

```
$ ./console.py
```

#### To execute the CLI using the Database Storage Engine Model:

```
$ HBNB_MYSQL_USER=hbnb_test HBNB_MYSQL_PWD=hbnb_test_pwd \
HBNB_MYSQL_HOST=localhost HBNB_MYSQL_DB=hbnb_test_db HBNB_TYPE_STORAGE=db \
./console.py
```

#### For a detailed description of all tests, run these commands in the CLI:

```
(hbnb) help help
List available commands with "help" or detailed help with "help cmd".
(hbnb) help

Documented commands (type help <topic>):
========================================
Amenity    City  Place   State  airbnb  create   help  show
BaseModel  EOF   Review  User   all     destroy  quit  update

(hbnb) help User
class method with .function() syntax
        Usage: User.<command>(<id>)
(hbnb) help create
create: create [ARG] [PARAM 1] [PARAM 2] ...
        ARG = Class Name
        PARAM = <key name>=<value>
                value syntax: "<value>"
        SYNOPSIS: Creates a new instance of the Class from given input ARG
                  and PARAMS. Key in PARAM = an instance attribute.
        EXAMPLE: create City name="Chicago"
                 City.create(name="Chicago")
```

* Tests in the CLI may also be executed with this syntax:

  * **destroy:** `<class name>.destroy(<id>)`

  * **update:** `<class name>.update(<id>, <attribute name>, <attribute value>)`

  * **update with dictionary:** `<class name>.update(<id>,
    <dictionary representation>)`

---

### Continuous Integration Tests

Uses [Travis-CI](https://travis-ci.org/) to run all tests on all commits to the
github repo

## Authors

* MJ Johnson, [@mj31508](https://github.com/mj31508)
* David John Coleman II, [davidjohncoleman.com](http://www.davidjohncoleman.com/) | [@djohncoleman](https://twitter.com/djohncoleman)
* Kimberly Wong, [kjowong](https://github.com/kjowong) | [@kjowong](https://twitter.com/kjowong) | [kjowong@gmail.com](kjowong@gmail.com)
* Carrie Ybay, [hicarrie](https://github.com/hicarrie) | [@hicarrie_](https://twitter.com/hicarrie_)
* Jared Heck, [jarehec](https://github.com/jarehec) | [@jarehec](https://twitter.com/jarehec)
* Jonathan Cardenas Pabon | [Github](https://github.com/guxal) | [Twitter](https://twitter.com/bitcoincucuta)
* Daniel Celis Tobon | [Github](https://github.com/danicelistobon) | [Twitter](https://twitter.com/danicelistobon)


## License

MIT License
