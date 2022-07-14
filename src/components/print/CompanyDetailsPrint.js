import {
    CIN,
    licenceNo,
    companyName,
    companyPhone,
    companyAddress
} from "../../constants/constants"

function CompanyDetailsPrint(){
    return(<><table className='company-table'>
    <tbody>
        <tr className="logo-space">
            <td style={{ width: '90px', height: '90px' }}><img class="img" src="" style={{ maxWidth: '180px', maxHeight: '120px' }} /></td>
            <td className='text-center'><span className='company-name'>{companyName.toUpperCase()}</span><br />
                <span className='gov-line'>भारत सरकार द्वारा पंजीकृत उपक्रम</span><br />
                <span className='company-span'>{companyAddress}</span><br />
                <span className='company-span'>{companyPhone}</span><br />
                <span className='company-span'> CIN: {CIN} LICENCE No.:{licenceNo}</span>
            </td>
            <td style={{ width: '180px', height: '90px' }}>&nbsp;</td>
        </tr>
    </tbody>
</table>
</>)
}
export default CompanyDetailsPrint;