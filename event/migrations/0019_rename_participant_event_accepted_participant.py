# Generated by Django 4.1.7 on 2023-04-02 07:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0018_event_fcfs_event_total_strength'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='participant',
            new_name='accepted_participant',
        ),
    ]