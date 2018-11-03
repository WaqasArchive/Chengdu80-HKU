# Generated by Django 2.1.3 on 2018-11-03 05:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20181102_1033'),
    ]

    operations = [
        migrations.CreateModel(
            name='IPO',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('indicative_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_shares', models.IntegerField()),
                ('left_shares', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('identify', models.IntegerField()),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='bid',
            name='investor_id',
        ),
        migrations.RemoveField(
            model_name='bid',
            name='issuer_id',
        ),
        migrations.AddField(
            model_name='bid',
            name='status',
            field=models.IntegerField(choices=[(0, 'Placed'), (1, 'Traded'), (2, 'Rejected')], default=1),
        ),
        migrations.AddField(
            model_name='ipo',
            name='issuer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Person'),
        ),
        migrations.AddField(
            model_name='bid',
            name='investor',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Person'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bid',
            name='ipo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.IPO'),
            preserve_default=False,
        ),
    ]
