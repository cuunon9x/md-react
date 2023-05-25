import { Form, Input, Button, Modal } from "antd";
import { LAYOUT, TAILLAYOUT } from "helpers/constants";
import { FIELD_REQUIRED } from "helpers/message";
import { toast } from "react-toastify";
import { createData } from "service/api/apiRequest.service";
import { optionsError, optionsSuccess } from "service/api/toast.service";

const ModalCreate = ({
  // listData,
  isRequestFormCreateOpen,
  setAddRequestFormCreateOpen,
  checkLoadData,
  handleGetListProducts
}) => {
  const [form] = Form.useForm();

  const onFinish = async (Formvalues) => {
    let data = {
      name: Formvalues.name?.trim(),
      price: Formvalues.price?.trim(),
    };
    // call API create

    var result = await createData("/product/add", data);
    if (result) {
      toast("Add successfully!", optionsSuccess);

      setAddRequestFormCreateOpen(false);
      checkLoadData();
      handleGetListProducts();
    } else {
      toast("Add failed, try again!", optionsError);
    }
  };

  return (
    <Modal
      title="Add New"
      centered
      visible={isRequestFormCreateOpen}
      footer={null}
      width={800}
      onCancel={() => setAddRequestFormCreateOpen(false)}
    >
      <Form {...LAYOUT} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Enter..." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: FIELD_REQUIRED }]}
        >
          <Input placeholder="Enter..." />
        </Form.Item>

        <Form.Item {...TAILLAYOUT}>
          <Button
            htmlType="button"
            onClick={() => setAddRequestFormCreateOpen(false)}
            style={{ marginRight: "16px" }}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Add New
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalCreate;
