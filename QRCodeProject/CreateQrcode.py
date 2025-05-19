import argparse
import os
import datetime
import qrcode
from PIL import Image

def Run(args):
    parser = argparse.ArgumentParser()
    parser.add_argument("--url")
    args = parser.parse_args(namespace=args)

    # 格納フォルダ
    output_folder = "QRCodeProject/png"
    # フォルダが存在しない場合は作成
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    output_path = os.path.join(output_folder, f'qrcode_{datetime.datetime.now().strftime("%Y%m%d%H%M%S")}.png')

    #version：QRコードのサイズ、1～40
    #error_correction：誤り訂正レベル
    #box_size：QRコードの各ボックス（セル）のピクセル数
    #border：QRコードの周囲にボーダーを追加
    qr = qrcode.QRCode(
        version=10,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=2,
        border=8
    )
    qr.add_data(args.url)
    qr.make()
    _img = qr.make_image(fill_color="black", back_color="#ffffff")
    _img.save(output_path)
    print("QRCode Created.")