# newsfeed

## installation

### configure

```shell
cp config/config_example.py config/config.py
```

Then add your YouTube API developer key in the new `config` file.

### virtual environment

Create a virtual environment for dependencies:

```shell
virtualenv venv
```

Install dependencies:

```shell
pip install -r requirements.txt
```

Activate it:

```shell
source venv/bin/activate
```

### run it

```shell
python app.py
```

Open a browser and head to `0.0.0.0:8080`
