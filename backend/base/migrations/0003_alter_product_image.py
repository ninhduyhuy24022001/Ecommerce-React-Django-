# Generated by Django 4.2 on 2023-11-07 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='sample.png', null=True, upload_to=''),
        ),
    ]
