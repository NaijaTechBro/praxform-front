import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Building, Send } from 'lucide-react';

const PasswordCriteria = () => (
    <ul className="space-y-2 text-sm text-gray-500 mt-4">
        <li className="flex items-center"><ShieldCheck className="h-4 w-4 text-green-500 mr-2" /> Eight Characters Long</li>
        <li className="flex items-center"><ShieldCheck className="h-4 w-4 text-green-500 mr-2" /> Contain Special Characters (&, #, $, etc)</li>
        <li className="flex items-center"><ShieldCheck className="h-4 w-4 text-green-500 mr-2" /> Contain One Number</li>
    </ul>
);

export default PasswordCriteria;