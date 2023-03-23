# Generated by Django 4.1.7 on 2023-03-22 15:56

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0002_delete_role_alter_branch_options'),
        ('event', '0014_remove_event_organizer_remove_event_participant_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participant',
            name='members',
        ),
        migrations.RemoveField(
            model_name='event',
            name='branch',
        ),
        migrations.AlterField(
            model_name='event',
            name='organizer',
            field=models.ManyToManyField(blank=True, related_name='event_organizer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='event',
            name='participant',
            field=models.ManyToManyField(blank=True, related_name='event_participant', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Organizer',
        ),
        migrations.DeleteModel(
            name='Participant',
        ),
        migrations.AddField(
            model_name='event',
            name='branch',
            field=models.ManyToManyField(blank=True, null=True, to='user.branch'),
        ),
    ]
