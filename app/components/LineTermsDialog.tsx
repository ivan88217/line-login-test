import * as Dialog from '@radix-ui/react-dialog';

interface LineTermsDialogProps {
  open: boolean;
  onAgree: () => void;
}

export function LineTermsDialog({ open, onAgree }: LineTermsDialogProps) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">使用者條約（Email 蒐集與使用說明）</Dialog.Title>
          <div className="text-gray-700 text-sm space-y-2 mb-6">
            <p>感謝您使用本服務。為了提供更完整的會員體驗與通知服務，我們將向您請求取得您的 Email 信箱。請您詳閱以下條款：</p>
            <p><b>1. 蒐集目的</b><br />我們將蒐集您的 Email 信箱，僅用於以下用途：<br />- 會員身份驗證與帳號管理<br />- 重要通知、服務異動、活動訊息之發送<br />- 客服聯繫與問題處理</p>
            <p><b>2. 使用範圍</b><br />您的 Email 僅會用於本服務相關用途，不會提供給第三方或用於未經授權之其他用途。</p>
            <p><b>3. 資料保護</b><br />我們將妥善保護您的個人資料，並依據相關法令規定處理。</p>
            <p><b>4. 同意聲明</b><br />當您點選「同意」並登入後，即表示您已閱讀、瞭解並同意本條約內容，並同意我們蒐集、處理及利用您的 Email 信箱。</p>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={onAgree}
            >
              同意
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 
