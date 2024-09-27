import { ProFormSelect } from '@ant-design/pro-form';
import React from 'react';
import { useIntl } from 'umi';

interface Props {
    name: string
    valueEnum?: { [key: string]: string }
    lable: string,
    rules?: any
    mode?: 'multiple' | 'tags'
    fieldProps?: any
}

const ISelectData: React.FC<Props> = (props) => {
    const { formatMessage } = useIntl()
    const { name, valueEnum, lable, rules, mode } = props

    return (
        <ProFormSelect
            label={formatMessage({ id: lable })}
            wrapperCol={{ span: 24 }}
            name={name}
            placeholder={formatMessage({ id: lable })}
            valueEnum={valueEnum}
            fieldProps={{
                showSearch: true,
                optionFilterProp: 'children',
                filterOption: (input: string, option: any) =>
                    option.label && String(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0,
                style: { width: "100%" },
                mode,
                ...props.fieldProps
            }}
            rules={rules}
        />
    )
};

export default ISelectData;