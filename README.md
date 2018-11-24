# tableau-awx-wdc
Tableau Web Data Connector for the AWX API (v2)

AWX does not support CORS at this time. To fix it install the [`django-cors-headers`](https://github.com/ottoyiu/django-cors-headers/) package in the `awx` user's venv at `/var/lib/awx/venv`. Then configure the `/etc/awx/settings.py` config file to contain the following:

```
from corsheaders.defaults import default_headers

MAX_PAGE_SIZE = 1000

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.staticfiles',
    'oauth2_provider',
    'rest_framework',
    'django_extensions',
    'djcelery',
    'channels',
    'polymorphic',
    'taggit',
    'social_django',
    'corsheaders',
    'awx.conf',
    'awx.main',
    'awx.api',
    'awx.ui',
    'awx.sso',
    'solo'
)

MIDDLEWARE_CLASSES = (  # NOQA
    'awx.main.middleware.MigrationRanCheckMiddleware',
    'awx.main.middleware.TimingMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'awx.main.middleware.ActivityStreamMiddleware',
    'awx.sso.middleware.SocialAuthMiddleware',
    'crum.CurrentRequestUserMiddleware',
    'awx.main.middleware.URLModificationMiddleware',
    'awx.main.middleware.DeprecatedAuthTokenMiddleware',
    'awx.main.middleware.SessionTimeoutMiddleware',
)

CORS_ORIGIN_ALLOW_ALL = True

CORS_ALLOW_HEADERS = default_headers + (
    'access-control-request-headers',
    'access-control-request-method',
    'connection',
    'host',
    'if-modified-since',
    'cache-control',
    'content-range',
)

CORS_EXPOSE_HEADERS = (
  'content-length',
  'content-range',
)
```
