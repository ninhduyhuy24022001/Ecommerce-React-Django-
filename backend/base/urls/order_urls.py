from django.urls import path

from base.views import order_views as views


urlpatterns = [
    path('add/', views.addOrderItems, name='add-order-items'),
    path('myorders/', views.getMyOrders, name='get-my-orders'),

    path('<str:pk>/', views.getOrderById, name='get-order-by-id'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='update-order-to-pay')
]
