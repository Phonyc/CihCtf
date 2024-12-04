import qrcode
import cv2
import base64
import os
import dotenv

dotenv.load_dotenv()

qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=1,
    border=1,
)
qr.add_data(os.getenv('FLAG11'))
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
#img.show()
img.save("mid1out.png") 

img = cv2.imread('mid1out.png')
jpg_img = cv2.imencode('.png', img)
b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')
b64_url = "data:image/png;base64," + b64_string

# print(b64_url)

qr2 = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=1,
)
qr2.add_data(b64_url)
qr2.make(fit=True)

img_2 = qr2.make_image(fill_color="black", back_color="white")
#img_2.show()
img_2.save("mid2out.png")
img = cv2.imread('mid2out.png')
jpg_img = cv2.imencode('.png', img)
b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')
b64_url = "data:image/png;base64," + b64_string

# print(b64_url)
with open("www/chall11/file.txt", "w") as writer:
    writer.write(b64_url)

