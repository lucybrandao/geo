import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Cria o usuário padrão a partir de variáveis de ambiente (ADMIN_USERNAME, ADMIN_PASSWORD)'

    def handle(self, *args, **kwargs):
        username = os.environ.get('ADMIN_USERNAME')
        password = os.environ.get('ADMIN_PASSWORD')

        if not username or not password:
            self.stdout.write('ADMIN_USERNAME ou ADMIN_PASSWORD não definidos — pulando.')
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Usuário "{username}" já existe — pulando.')
            return

        User.objects.create_superuser(username=username, password=password, email='')
        self.stdout.write(f'Usuário "{username}" criado com sucesso.')
