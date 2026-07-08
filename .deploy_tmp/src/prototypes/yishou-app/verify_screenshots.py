import sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

screenshots_dir = r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\screenshots'

screenshot_map = {
    'login_main': '01-登录页-主登录.png',
    'login_sms': '02-登录页-手机号登录.png',
    'login_password': '03-登录页-密码登录.png',
    'register': '02-注册页.png',
    'main_bayu': '05-主界面-巴渝.png',
    'main_yishou': '06-主界面-益寿.png',
    'service_meal': '07-助餐服务.png',
    'pindan': '08-土货拼购.png',
    'bayu_plaza': '14-巴渝-广场.png',
    'bayu_circles': '15-巴渝-圈子.png',
    'points_mall': '11-积分商城.png',
    'settings': '12-设置页.png',
    'my_profile': '13-我的资料.png',
    'messages': '09-消息页.png',
}

print('Checking screenshots:')
all_ok = True
for key, filename in screenshot_map.items():
    path = os.path.join(screenshots_dir, filename)
    exists = os.path.exists(path)
    size = os.path.getsize(path) if exists else 0
    status = f'OK ({size/1024:.0f} KB)' if exists else 'MISSING!'
    if not exists:
        all_ok = False
    print(f'  {key}: {filename} - {status}')

print(f'\nAll screenshots available: {all_ok}')
