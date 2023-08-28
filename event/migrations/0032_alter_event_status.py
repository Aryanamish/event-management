# Generated by Django 4.1.7 on 2023-08-27 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0031_event_report_event_report_verified_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='status',
            field=models.PositiveIntegerField(choices=[(1, 'Pending'), (2, 'Displayed'), (3, 'Completed'), (4, 'Report Submitted'), (5, 'Report Approved'), (6, 'Certified')], default=1),
        ),
    ]
