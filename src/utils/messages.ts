const typeTemplate = "${label} không phải là một ${type} hợp lệ";

export const defaultValidateMessages = {
    default: "Lỗi xác nhận trên trường ${label}",
    required: "${label} là bắt buộc",
    enum: "${label} phải là một trong [${enum}]",
    whitespace: "${label} không thể trống",
    date: {
        format: "${label} không hợp lệ với định dạng ngày tháng",
        parse: "${label} không thể được phân tích làm ngày tháng",
        invalid: "${label} là ngày tháng không hợp lệ",
    },
    types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
    },
    string: {
        len: "${label} phải có đúng ${len} ký tự",
        min: "${label} phải có ít nhất ${min} ký tự",
        max: "${label} không thể dài hơn ${max} ký tự",
        range: "${label} phải có độ dài từ ${min} đến ${max} ký tự",
    },
    number: {
        len: "${label} phải bằng ${len}",
        min: "${label} không thể nhỏ hơn ${min}",
        max: "${label} không thể lớn hơn ${max}",
        range: "${label} phải nằm trong khoảng từ ${min} đến ${max}",
    },
    array: {
        len: "${label} phải có đúng ${len} phần tử",
        min: "${label} không thể ít hơn ${min} phần tử",
        max: "${label} không thể nhiều hơn ${max} phần tử",
        range: "${label} phải có số phần tử từ ${min} đến ${max}",
    },
    pattern: {
        mismatch: "${label} không khớp với mẫu ${pattern}",
    },
};